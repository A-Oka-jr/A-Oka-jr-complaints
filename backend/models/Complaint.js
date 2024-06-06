import mongoose from "mongoose";
import User from "./User.js";
import Client from "./Client.js";

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    description: { type: String, required: true },
    comment: { type: String },
    status: { type: Number, required: true, default: 1 },

    imageUrls: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
