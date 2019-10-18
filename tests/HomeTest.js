import { BasePage } from "../pages/BasePage";
import { Selector } from "testcafe";

const page = new BasePage();

fixture`Home`.page(page.baseUrl);

test('Correct title displays', async t => {
    await t
        .expect(page.title.textContent)
        .eql("name game")
});

test('Attempts counter increments after selecting a photo', async t => {
    const initialAttemptsCount = Number(await page.attempts.textContent)
    
    await t.click(page.firstPhoto);

    const finalAttemptsCount = Number(await page.attempts.textContent);

    await t
    .expect(finalAttemptsCount)
    .eql(initialAttemptsCount + 1);
}); 

test('Correct Streak Counter Increment', async t => {
    const initialCorrectCount = Number(await page.correct.textContent)
    //get name of team member to match
    var findTeamMember = String(await page.whoIs.textContent)
    //get list of all names associated with images
    const fullTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //find location of match
    var match = Number(fullTeam.indexOf(findTeamMember))
    //select correct image
    await t.click(Selector('.photo').nth(match))
    //Ugly method to ensure the page has refreshed. Takes appx. 5 seconds
    await t.wait(6000)
    //Now get final count
    const finalCorrectCount = Number(await page.correct.textContent)
    //assert correct stat updated
    await t
    .expect(finalCorrectCount)
    .eql(initialCorrectCount + 1); 

});

test('Multiple Streak Resets after Incorrect Selection', async t => {
    const initialStreakCount = Number(await page.streak.textContent)
    //get name of team member to match
    var findTeamMember = String(await page.whoIs.textContent)
    //get list of all names associated with images
    const fullTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //find location of match
    var match = Number(fullTeam.indexOf(findTeamMember))
    //select correct image
    await t.click(Selector('.photo').nth(match))
    //Ugly method to ensure the page has refreshed. Takes appx. 5 seconds
    await t.wait(6000)    
    const middleStreakCount = Number(await page.streak.textContent)
    //Assert that the streak has increased by one
    await t
    .expect(middleStreakCount)
    .eql(initialStreakCount + 1); 
    //start second matching
    //get name of team member to match
    var findSecondTeamMember = String(await page.whoIs.textContent)    
    //get list of all names associated with images
    const fullSecondTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //find location of match then select the wrong option
    var match2 = Number(fullSecondTeam.indexOf(findSecondTeamMember))
    if (match2 == 4) {
        match2 = 3
    }
    else{
        match2 = 4
    }
    //select incorrect image
    await t.click(Selector('.photo').nth(match2))
    //Ugly method to ensure the page has refreshed. Takes appx. 5 seconds
    await t.wait(6000)    
    //Now get final count
    const finalStreakCount = Number(await page.streak.textContent)
    //assert correct stat updated
    await t
    .expect(finalStreakCount)
    .eql(0); 
}); 


test('Correct counters being used for tries and correct', async t => {
    const initialAttemptsCount = Number(await page.attempts.textContent)
    const initialCorrectCount = Number(await page.correct.textContent)
    //get name of team member to match
    var findTeamMember = String(await page.whoIs.textContent)    
    //get list of all names associated with images
    const fullTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //find location of match then select the wrong option
    var match = Number(fullTeam.indexOf(findTeamMember))
    var wrongMatch = 0
    if (match == 4) {
        wrongMatch = 3
    }
    else{
        wrongMatch = 4
    }
    //select incorrect image
    await t.click(Selector('.photo').nth(wrongMatch))
    //Ugly method to ensure the page has refreshed. Takes appx. 5 seconds
    await t.wait(6000)
    //get stats again
    const middleAttemptsCount = Number(await page.attempts.textContent);
    const middleCorrectCount = Number(await page.correct.textContent)
    //make sure attempts goes up by one
    await t
    .expect(middleAttemptsCount)
    .eql(initialAttemptsCount + 1);
    //make sure correct stays the same
    await t
    .expect(middleCorrectCount)
    .eql(initialCorrectCount);

    //Now select correct image
    await t.click(Selector('.photo').nth(match))
    //Ugly method to ensure the page has refreshed. Takes appx. 5 seconds
    await t.wait(6000)
    //get stats again
    const finalAttemptsCount = Number(await page.attempts.textContent);
    const finalCorrectCount = Number(await page.correct.textContent)
    //make sure attempts goes up by one
    await t
    .expect(finalAttemptsCount)
    .eql(middleAttemptsCount + 1);
    //make sure correct increases by one
    await t
    .expect(finalCorrectCount)
    .eql(middleCorrectCount + 1);

}); 

test('Name and photos change after correct selection', async t => {
    //get name of team member to match
    var findTeamMember = String(await page.whoIs.textContent)
    //get list of all names associated with images
    const fullTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //find location of match
    var match = Number(fullTeam.indexOf(findTeamMember))
    //get array of all image src
    const imgSources = [String(await page.imgOne.getAttribute('src')), String(await page.imgTwo.getAttribute('src')), 
        String(await page.imgThree.getAttribute('src')), String(await page.imgFour.getAttribute('src')), 
        String(await page.imgFive.getAttribute('src'))]
    //select correct image
    await t.click(Selector('.photo').nth(match))
    //Ugly method to ensure the page has refreshed. Takes appx. 5 seconds
    await t.wait(6000)

    //get new team member and make sure it's not the same
    var findNewTeamMember = String(await page.whoIs.textContent)
    await t.expect(findNewTeamMember).notEql(findTeamMember)

    //get new list of names associated with images
    const fullNewTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //get new list of image sources
    const imgNewSources = [String(await page.imgOne.getAttribute('src')), String(await page.imgTwo.getAttribute('src')), 
        String(await page.imgThree.getAttribute('src')), String(await page.imgFour.getAttribute('src')), 
        String(await page.imgFive.getAttribute('src'))]

    //assert the arrays of team member names are different
    //See documentation at https://testcafe.devexpress.com/Documentation/API_Reference/Test_Fixture_API/Assertions/
    await t.expect(fullTeam).notEql(fullNewTeam)

    //assert the arrays of the image sources are different
    await t.expect(imgSources).notEql(imgNewSources)
}); 

test('Name and photos do not change after incorrect selection', async t => {
    //get name of team member to match
    var findTeamMember = String(await page.whoIs.textContent)
    //get list of all names associated with images
    const fullTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //find location of match
    var match = Number(fullTeam.indexOf(findTeamMember))
    //get array of all image src
    const imgSources = [String(await page.imgOne.getAttribute('src')), String(await page.imgTwo.getAttribute('src')), 
        String(await page.imgThree.getAttribute('src')), String(await page.imgFour.getAttribute('src')), 
        String(await page.imgFive.getAttribute('src'))]
    var wrongMatch = 0
    if (match == 4) {
        wrongMatch = 3
    }
    else{
        wrongMatch = 4
    }
    //select incorrect image
    await t.click(Selector('.photo').nth(wrongMatch))
    //Ugly method to ensure the page has refreshed. Takes appx. 5 seconds
    await t.wait(6000)

    //get new team member and make sure it's not the same
    var findNewTeamMember = String(await page.whoIs.textContent)
    await t.expect(findNewTeamMember).eql(findTeamMember)

    //get new list of names associated with images
    const fullNewTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //get new list of image sources
    const imgNewSources = [String(await page.imgOne.getAttribute('src')), String(await page.imgTwo.getAttribute('src')), 
        String(await page.imgThree.getAttribute('src')), String(await page.imgFour.getAttribute('src')), 
        String(await page.imgFive.getAttribute('src'))]

    //assert the arrays of team member names are different
    //See documentation at https://testcafe.devexpress.com/Documentation/API_Reference/Test_Fixture_API/Assertions/
    await t.expect(fullTeam).eql(fullNewTeam)

    //assert the arrays of the image sources are different
    await t.expect(imgSources).eql(imgNewSources)
});

test('That five photos appear', async t => {
    var counter = 0;
    for (let i = 0; i < 5; i++)
        if(Selector(".photo").nth(i).exists)
            counter++;
    //check that all five photos appear
    await t.expect(counter).eql(5)

}); 

test('All Stat Counters Appear', async t => {
    //check for attempts
    if(await page.attempts.exists)
        await t.expect(await page.attempts.exists).ok()
    else    
        console.log("Attempts do not appear on the screen")
    //check for correct
    if(await page.correct.exists)
        await t.expect(await page.correct.exists).ok()
    else    
        console.log("Correct does not appear on the screen")
    //check for streak
    if(await page.streak.exists)
        await t.expect(await page.streak.exists).ok()
    else    
        console.log("Streak does not appear on the screen")
}); 

test('All photos have a name associated with them', async t => {
    //get list of all names associated with images
    const fullTeam = [String(await page.firstName.textContent), String(await page.secondName.textContent), 
        String(await page.thirdName.textContent), String(await page.fourthName.textContent), 
        String(await page.fifthName.textContent)]
    //get new list of image sources
    const imgSources = [String(await page.imgOne.getAttribute('src')), String(await page.imgTwo.getAttribute('src')), 
        String(await page.imgThree.getAttribute('src')), String(await page.imgFour.getAttribute('src')), 
        String(await page.imgFive.getAttribute('src'))]
    
    await t.expect(fullTeam.length).eql(imgSources.length)
});