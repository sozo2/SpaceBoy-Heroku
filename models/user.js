var mongoose = require('mongoose');
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name field must be filled out"],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, "Last name field must be filled out"],
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Username field must be filled out"],
        trim: true,
        unique: [true, "Username already exists. Please try a different username."],
    },
    email: {
        type: String,
        required: [true, "Must input email"],
        minlength: [5, "Email must be at least 5 characters"],
        maxlength: [40, "Email can be no longer than 40 characters"],
        unique: [true, "Email already registered. Please log in or use different email."],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email not in valid format. Please try again."]
    },
    is_admin: {
        type: Boolean
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32,
        validate: {
          validator: function( value ) {
            return /^([a-zA-Z0-9@*#]{8,15})$/.test( value );
          },
          message: "Password failed validation, you must have at least 1 number, 1 uppercase letter, and 1 special character"
        }
    },
    _articles: [{type: Schema.Types.ObjectId, ref: 'Article'}],
    },
    {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var User = mongoose.model('User', UserSchema);