import { initializeApp } from 'firebase-admin/app'
import UserOnCreate from './triggers/userOnCreate'

initializeApp()

exports.authUserOnCreate = UserOnCreate
