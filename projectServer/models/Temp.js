import mongoose from 'mongoose';

const TempSchema = mongoose.Schema({
    "temp": {
      "type": "String"
    },
    "precipita": {
      "type": "String"
    }
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false })

const Temp = mongoose.model("Temp", TempSchema);

export default Temp;