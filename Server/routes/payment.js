const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.post("/", async (req, res) => {
  const payload = req.body;
  const KhaltiResponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );
  console.log(KhaltiResponse.data);
  if (KhaltiResponse) {
    res.json({
      success: true,
      data: KhaltiResponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

module.exports = router;
