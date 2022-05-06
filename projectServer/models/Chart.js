import mongoose from 'mongoose';

const ChartSchema = mongoose.Schema({
    "time": {
      "type": "String"
    },
    "emOperaçao": {
      "type": "String"
    },
    "livres": {
      "type": "String"
    },
    "emAndamento": {
      "type": "String"
    }
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false })

const Chart = mongoose.model("Chart", ChartSchema);

export default Chart;