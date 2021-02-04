const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const LinkedList = require('./language-linkedlist')

const languageRouter = express.Router()
const bodyParser = express.json()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      })
  
      req.language = language

      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
        )

      // console.log('language is', req.language, 'and words are', words)

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      )

      const headWord = words.find(word => word.id === req.language.head)
    
      res.status(200).json({
        nextWord: headWord.original,
        wordCorrectCount: headWord.correct_count,
        wordIncorrectCount: headWord.incorrect_count,
        totalScore: req.language.total_score
      })
    }
    catch(error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', bodyParser, async (req, res, next) => {

    const { body } = req;

    if (!body || !body.guess) {
      return res.status(400).json({ error: `Request is missing a 'guess' in the request body`})
    }

    const getWords = async () => {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      )
      return words;
    }

    const theHead = req.language.head;
    const words = await getWords();
    const headWord = {};
    await Object.assign(headWord, words.find(word => word.id === theHead));

    const linkedListOfWords = new LinkedList();
    words.forEach((word => {
      linkedListOfWords.insertNew(word)
    }))

    const updateTheWords = async () => {
      const words = await linkedListOfWords.seeAll();
      await words.forEach(async word => {
        await LanguageService.updateLanguageWords(
          req.app.get('db'),
          word.id,
          word
        )
      })
    }

    const getTheNextWord = async () => {
      await updateTheWords();
      const newWords = await getWords();
      return await newWords.find(word => word.id === linkedListOfWords.head.value.id);
    }

    if (body.guess === headWord.translation) {
      try {
        await linkedListOfWords.ifCorrect();
        await LanguageService.updateUserTotalScore(
          req.app.get('db'),
          req.user.id,
          req.language.total_score + 1
        )

        const nextWordUp = await getTheNextWord();
        await LanguageService.updateUserLanguageHead(
          req.app.get('db'),
          req.user.id,
          nextWordUp.id
        )

        return await res.status(200).json({
          nextWord: nextWordUp.original,
          totalScore: req.language.total_score + 1,
          wordCorrectCount: headWord.correct_count + 1,
          wordIncorrectCount: headWord.incorrect_count,
          answer: headWord.translation,
          isCorrect: true
        })
      }
      catch(error) {
        next(error)
      }
    }

    else {
      try {
        await linkedListOfWords.ifIncorrect();
        const nextWordUp = await getTheNextWord();
        await LanguageService.updateUserLanguageHead(
          req.app.get('db'),
          req.user.id,
          nextWordUp.id
        )

        return await res.status(200).json({
          nextWord: nextWordUp.original,
          totalScore: req.language.total_score,
          wordCorrectCount: headWord.correct_count,
          wordIncorrectCount: headWord.incorrect_count + 1,
          answer: headWord.translation,
          isCorrect: false
        })
      }
      catch(error) {
        next(error);
      }
    }
  })

module.exports = languageRouter
