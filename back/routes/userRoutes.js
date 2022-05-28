const userRoutes = express.Router();

userRoutes.get('/art', async (req, res) => {
  // panaudoti getArticlesDb
  try {
    const artArr = await getArticlesDB();
    res.json(artArr);
  } catch (error) {
    console.log('error ===', error);
    res.sendStatus(500);
  }
});

// POST /register - gaunam email ir password
userRoutes.post('/register', validateUser, async (req, res) => {
  const newUser = req.body;
  // hash password (bcryptjs)
  newUser.password = hashPassword(newUser.password);
  // saveToDb(newUser);
  try {
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const saveResult = await executeDb(sql, [newUser.email, newUser.password]);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no user created');
  } catch (error) {
    console.log('POST /register ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json('user alredy exists');
      return;
    }

    res.sendStatus(500);
  }
});

userRoutes.post('/login', validateUser, async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasSlaptazodis = req.body.password;

  const foundUserArr = await findUserByEmail(gautasEmail);

  const foundUser = foundUserArr[0];
  console.log('foundUser ===', foundUser);

  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  if (!passWordsMatch(gautasSlaptazodis, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }

  const payload = { userId: foundUser.id };
  const token = generateJwtToken(payload);

  res.json({ success: true, token });
});

module.exports = userRoutes;
