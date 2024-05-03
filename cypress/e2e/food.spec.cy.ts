
describe('Foods', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should add a new food', () => {
    cy.contains('Add a new food');
    cy.get('input[name="food_id"]').type('0');
    cy.get('input[name="food_name"]').type('apple');    
    cy.get('input[name="food_description"]').type('apple description');
    cy.get('input[name="food_color"]').type('green');    
    cy.get('input[name="food_group"]').type('fruit');
        
    //Verificar que se ha invocado al metodo 
    let angular!: any;
    let componentInstance!:any;
    let componentStore!:any;

    // You can access the window object in cypress using window() method
    cy.window()
      .then((win) => {
        // Grab a reference to the global ng object
        angular = (win as any).ng;
      })
      .then(() => cy.document())
      .then((doc) =>{
        
        // Ejemplo con Stub -> NO llama a la funcion original
        
        //const componentInstance = angular
        //    .getComponent(doc.querySelector('app-food-form'));
        //cy.stub(componentInstance, 'addFood');
        //cy.get('button[name="addButton"]').click();
        
        // Just put this test to the end of the event loop
         //   in order to make sure angular runtime engine
         //   will have fired the click event that calls the
         //   method calling under test.
        
        //cy.wait(0).then(() => 
         //  expect(componentInstance.addFood).to.have.been.called);

        //Ejemplo con SPY -> Llama a la función original

        componentInstance = angular.getComponent(doc.querySelector('app-food-form'));      
        componentStore = componentInstance.store;

        cy.spy(componentInstance, 'addFood');     
        cy.spy(componentStore, 'dispatch');     
      });

    cy.get('button[name="addButton"]').click();
    //Verificar que se ha invocado el metodo
    cy.wait(0).then(() => expect(componentInstance.addFood).to.have.been.called);
    //Verificar que se ha invocado la accion
    cy.wait(0).then(() => expect(componentStore.dispatch).to.have.been.called);

    
    
    //Verificar que se ha incrementado la lista de comida, accedienco al id o al name
    cy.get('p[name="listOfFoods"]').should('have.text', 'List of foods: 1');
    cy.get('#listOfFoods').should('have.text', 'List of foods: 1');
  })

  it('Should remove an existing food', () => {
    cy.contains('Add a new food');
    cy.get('input[name="food_id"]').type('0');
    cy.get('input[name="food_name"]').type('apple');    
    cy.get('input[name="food_description"]').type('apple description');
    cy.get('input[name="food_color"]').type('green');    
    cy.get('input[name="food_group"]').type('fruit');
    cy.get('button[name="addButton"]').click();

    //Verificar que se ha invocado al metodo 
    let angular!: any;
    let componentInstance!:any;
    let componentStore!:any;

    // You can access the window object in cypress using window() method
    cy.window()
      .then((win) => {
        // Grab a reference to the global ng object
        angular = (win as any).ng;
      })
      .then(() => cy.document())
      .then((doc) =>{
        componentInstance = angular.getComponent(doc.querySelector('app-food-list'));      
        componentStore = componentInstance.store;
        cy.spy(componentInstance, 'deleteFood');     
        cy.spy(componentStore, 'dispatch');     
      });

    cy.get('#deleteFood').click();
    //Verificar que se ha invocado el metodo
    cy.wait(0).then(() => expect(componentInstance.deleteFood).to.have.been.called);
    //Verificar que se ha invocado la accion
    cy.wait(0).then(() => expect(componentStore.dispatch).to.have.been.called);

    //Verificar que se ha decrementado la lista de comida, accedienco al id o al name
    cy.get('p[name="listOfFoods"]').should('have.text', 'List of foods: 0');
    cy.get('#listOfFoods').should('have.text', 'List of foods: 0');
  })
/*
  it('Should mount the component', () => {
      cy.mount(FoodFormComponent)
  })
*/
})

