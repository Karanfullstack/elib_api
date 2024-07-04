import mongoose, { Document, PipelineStage } from 'mongoose'

export interface PaginationOptions {
    page: number
    limit: number
}

export interface PaginationResult<T> {
    docs: T[]
    totalDocs: number
    limit: number
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export const paginate = async <T extends Document>(
    model: mongoose.Model<T>,
    pipeline: object[],
    options: PaginationOptions
): Promise<PaginationResult<T>> => {
    const { limit, page } = options
    const paginationPipeline = [
        ...pipeline,
        {
            $facet: {
                docs: [{ $skip: (page - 1) * limit }, { $limit: limit }],
                totalDocs: [{ $count: 'count' }],
            },
        },
        {
            $unwind: '$totalDocs',
        },
        {
            $project: {
                docs: 1,
                totalDocs: '$totalDocs.count',
                limit: { $literal: limit },
                page: { $literal: page },
                totalPages: {
                    $ceil: { $divide: ['$totalDocs.count', limit] },
                },
                hasNextPage: {
                    $lt: [{ $multiply: [page, limit] }, '$totalDocs.count'],
                },
                hasPrevPage: {
                    $gt: [page, 1],
                },
            },
        },
    ]

    const result = await model
        .aggregate(paginationPipeline as PipelineStage[])
        .exec()

    if (result.length > 0) {
        return result[0]
    }

    return {
        docs: [],
        totalDocs: 0,
        limit,
        page,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    }
}

export default paginate
