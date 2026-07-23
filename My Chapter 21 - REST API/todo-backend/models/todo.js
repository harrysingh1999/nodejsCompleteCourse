import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    date: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("todo", todoSchema);
