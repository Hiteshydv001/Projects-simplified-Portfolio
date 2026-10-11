import { Schema, model, models, type Model } from 'mongoose'

interface AnalyticsVisitRecord { visitorHash: string; hour: Date; views: number }

const schema = new Schema<AnalyticsVisitRecord>({
  visitorHash: { type: String, required: true },
  hour: { type: Date, required: true },
  views: { type: Number, required: true, default: 0 },
}, { versionKey: false })

schema.index({ visitorHash: 1, hour: 1 }, { unique: true })
// Retain enough history for a 30-day comparison without keeping indefinite identifiers.
schema.index({ hour: 1 }, { expireAfterSeconds: 62 * 24 * 60 * 60 })

const AnalyticsVisit = (models.AnalyticsVisit as Model<AnalyticsVisitRecord> | undefined) || model<AnalyticsVisitRecord>('AnalyticsVisit', schema)
export default AnalyticsVisit
