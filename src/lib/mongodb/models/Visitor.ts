import mongoose from 'mongoose'

const VisitorSchema = new mongoose.Schema({
  totalCount: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  visitors: [
    {
      hash: String,
      firstVisit: Date,
      lastVisit: Date,
      visitCount: {
        type: Number,
        default: 1,
      },
    },
  ],
  dailyStats: [
    {
      date: {
        type: String,
        unique: false,
      },
      count: Number,
      uniqueCount: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema)
