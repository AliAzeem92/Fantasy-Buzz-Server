// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: function() {
//       return this.provider !== 'google';
//     },
//   },
//   avatar: {
//     type: String,
//     default: "",
//   },
//   provider: {
//     type: String,
//     enum: ['local', 'google'],
//     default: 'local',
//   },
//   verifyOtp: {
//     type: String,
//     default: "",
//   },
//   verifyOtpExpireAt: {
//     type: Number,
//     default: 0,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   resetOtp: {
//     type: String,
//     default: "",
//   },
//   resetOtpExpireAt: {
//     type: Number,
//     default: 0,
//   },
//   resetToken: {
//     type: String,
//     default: "",
//   },
//   resetTokenExpireAt: {
//     type: Number,
//     default: 0,
//   },
// });

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: function () {
      // Facebook users sometimes don't share email
      return this.provider === "local" || this.provider === "google";
    },
    unique: true,
    sparse: true, // allows multiple docs without email (for Facebook)
  },

  password: {
    type: String,
    required: function () {
      // Only local users need a password
      return this.provider === "local";
    },
  },

  avatar: {
    type: String,
    default: "",
  },

  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },

  facebookId: {
    type: String,
    default: "",
    sparse: true,
  },

  googleId: {
    type: String,
    default: "",
  },

  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpireAt: {
    type: Number,
    default: 0,
  },
  resetToken: {
    type: String,
    default: "",
  },
  resetTokenExpireAt: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
