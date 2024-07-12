import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import {config} from '@config/config';

//Scenario: Get all Goals
Given ('My User is logged in', ()=>{
    cy.log('Logged')
})

When('My User sent request to get all Goals', ()=>{
    cy.request({
        method: 'GET',
        url: 'https://api.clickup.com/api/v2/team/9012104567/goal?include_completed=true',
        headers:{
            Authorization: 'pk_74608926_L08YGIID2CO7OZMSBCFITPB717JVGRRW'
        }  
    }).then((resp)=>{
        cy.wrap(resp.status).as('statusCodeFromGet')
        resp.status
    })
    
})

Then ('My Status code from Get should be 200', ()=>{
    cy.get('@statusCodeFromGet').then((status)=>{
        expect(status).to.eq(200)
    })
})

///Scenario: Create new Goal
const BASE_URL = Cypress.env('base_url') as string;
const CREATE_GOAL_URL = config.url.goal.create_goal;

When('User Sent POST request to Create a new Goal from file {string}', (filename:string) => {
    cy.fixture(filename).then((body) =>{
const goalString = Math.random().toString(36).substring(2, 15);
    
        body.name = `My Goal ${goalString}`;
        cy.sentRequest('post', `${BASE_URL}/${CREATE_GOAL_URL}`, body)
    });
});

//Scenario: Get Goal by ID
When('User send Get request to get Goal by ID', () => {
  const goalId = Cypress.env('goal_id') as string;
  cy.request({
    method: 'GET',
    url: `${BASE_URL}/goal/08ebe895-b757-48d6-973d-032364d2d332`,
    headers: {
      Authorization: 'pk_74608926_L08YGIID2CO7OZMSBCFITPB717JVGRRW'
    }
  }).then((resp) => {
    cy.wrap(resp.status).as('statusCodeFromGetById')
  });
});

Then('Status code from Get Goal by ID should be 200', () => {
  cy.get('@statusCodeFromGetById').then((status) => {
    expect(status).to.eq(200)
  });
});

//Scenario: Delete an existing Goal
When('User Sent DELETE request to Delete existing Goal',()=>{
    const goalId = Cypress.env('goal_id') as string;
  cy.request({
    method: 'DELETE',
    url: `${BASE_URL}/goal/7c90624d-b0a5-4cf2-91da-d3a9b6edcce3`,
    headers: {
      Authorization: 'pk_74608926_L08YGIID2CO7OZMSBCFITPB717JVGRRW'
    }
  }).then((resp) => {
    cy.wrap(resp.status).as('statusCodeFromDelete')
  });
});

Then('Status code from Delete should be 200', () => {
  cy.get('@statusCodeFromDelete').then((status) => {
    expect(status).to.eq(200)
  });
} )

//Scenario: Create KeyResults
When('User Sent POST request to Create KeyResults from file {string}', (filename: string) => {
  cy.fixture(filename).then((body) => {
    const keyResultString = Math.random().toString(36).substring(2, 15);
    body.name = `my New Key Result Name ${keyResultString}`;
    cy.request({
      method: 'POST',
      url: `${BASE_URL}/goal/cd4db554-e193-4899-a6a3-9f87b8ab3c65/key_result`,
      body: body,
      headers: {
        Authorization: 'pk_74608926_L08YGIID2CO7OZMSBCFITPB717JVGRRW'
      }
    }).then((resp) => {
      cy.wrap(resp.status).as('statusCodeFromCreateKeyResults')
    });
  });
});

Then('Status code from Create KeyResults request should be 200', () => {
  cy.get('@statusCodeFromCreateKeyResults').then((status) => {
    expect(status).to.eq(200)
  });
});

// Scenario: Edit KeyResults 
When('User Sent PUT request to Edit KeyResults from file {string}', (filename: string) => {
  const keyResultId = Cypress.env('key_result_id') as string;
  cy.fixture(filename).then((body) => {
    cy.request({
      method: 'PUT',
      url: `${BASE_URL}/key_result/27f0a4d2-c9f4-4628-89d0-d2eb251cadb0`,
      body: body,
      headers: {
        Authorization: 'pk_74608926_L08YGIID2CO7OZMSBCFITPB717JVGRRW'
      }
    }).then((resp) => {
      cy.wrap(resp.status).as('statusCodeFromEditKeyResults')
    });
  });
});

Then('Status code from Edit KeyResults request should be 200', () => {
  cy.get('@statusCodeFromEditKeyResults').then((status) => {
    expect(status).to.eq(200)
  });
});