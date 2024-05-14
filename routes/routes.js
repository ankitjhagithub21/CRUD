const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/", async(req, res) => {
    try {
        const users = await User.find(); 
        res.render("index", { users }); 
      } catch (error) {
        res.status(500).send("Error fetching users: " + error.message);
      }
});

router.get("/add", (req, res) => {
  res.render("add_user");
});



router.post("/add", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      phone
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete user route
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await User.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "User deleted."
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
});

// Route to display the update form
router.get('/update/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.render('update_user', { user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Route to handle the update request
  router.post('/update/:id', async (req, res) => {
    const { name, email, phone } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, phone },
        { new: true}
      );
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.redirect("/")
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

module.exports = router;
