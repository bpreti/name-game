import { Selector } from "testcafe";

export class BasePage {

    baseUrl = 'http://www.ericrochester.com/name-game/';

    title = Selector(".header")
    //All photos
    firstPhoto = Selector(".photo")
    secondPhoto = Selector(".photo").nth(1)
    thirdPhoto = Selector(".photo").nth(2)
    fourthPhoto = Selector(".photo").nth(3)
    fifthPhoto = Selector(".photo").nth(4)
    //stats
    attempts = Selector(".attempts")
    correct = Selector(".correct")
    streak = Selector(".streak")
    //who we are finding
    whoIs = Selector('span#name').withAttribute('data-n');
    //All names
    firstName = Selector('.name')
    secondName = Selector('.name').nth(1)
    thirdName = Selector('.name').nth(2)
    fourthName = Selector('.name').nth(3)
    fifthName = Selector('.name').nth(4)
    //image sources
    imgOne = Selector('img')
    imgTwo = Selector('img').nth(1)
    imgThree = Selector('img').nth(2)
    imgFour = Selector('img').nth(3)
    imgFive = Selector('img').nth(4)
}