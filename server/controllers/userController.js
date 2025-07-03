import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import transactionModel from "../models/transactionModel.js";

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const paymentStripe = async (req, res) => {
  try {
    const { userId } = req;
    const { planId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Plan not found" });
    }
    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: newTransaction.plan,
          },
          unit_amount: newTransaction.amount * 100 * 8.5,
        },
        quantity: 1,
      },
    ];

    const frontendUrl = "https://only-vercel-2bw4.vercel.app/";

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&transactionId=${newTransaction._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&transactionId=${newTransaction._id}`,
    });

    return res.status(201).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyStripe = async (req, res) => {
  try {
    const { userId } = req;
    const { transactionId, success } = req.body;

    if (success) {
      const transactionData = await transactionModel.findById(transactionId);
      await transactionModel.findByIdAndUpdate(transactionId, {
        payment: true,
      });
      const user = await userModel.findById(userId);
      const creditBalance = user.creditBalance + transactionData.credits;

      await userModel.findByIdAndUpdate(user._id, {
        creditBalance: creditBalance,
      });

      res.json({
        success: true,
        message: "paid",
      });
    } else {
      await transactionModel.findByIdAndDelete(transactionId);
      return res.json({
        success: false,
        message: "Not paid",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
