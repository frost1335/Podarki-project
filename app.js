const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const varMiddleware = require('./middleware/var')
const auth = require('./middleware/auth')

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const addRouter = require('./routes/add')

const store = new MongoStore({
  collection: "session",
  uri: "mongodb+srv://Dilrozbek_Raximov:931897318Rd@cluster0.e9gps.mongodb.net/catalog?retryWrites=true&w=majority",
});

const hbs = exphbs.create({
  defaultLayout: "layout",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  extname: "hbs",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.use(
  session({
    secret: 'Some secret',
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.engine("hbs", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(varMiddleware)

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use('/admin', auth, addRouter)



module.exports = app;
