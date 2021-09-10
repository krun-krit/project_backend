const gate = require('./data/tollGate')
const card = require('./data/card')
const user = require('./data/customer')
const staff = require('./data/officer')


var gate_detail = []
var card_detail = []
var user_detail = []
var staff_detail = []


const Gate = function ({id, name, price}){
    this.id = id
    this.name = name
    this.price = price
}

Gate.prototype.getGate = function (){
    return {
        id: this.id,
        name: this.name,
        price: this.price
    }
}

const Card = function ({id, id_card, id_officer, id_tollGate, top_up }){
    this.id = id
    this.id_card = id_card
    this.id_officer = id_officer
    this.id_tollGate = id_tollGate
    this.top_up = top_up

}

const User = function ({id_card, firstname, lastname, address, phone, email}){
    this.id_card = id_card
    this.firstname = firstname
    this.lastname = lastname
    this.address = address
    this.phone = phone
    this.email = email
}

const Staff = function ({id, name, phone, address}){
    this.id = id
    this.name = name
    this.phone = phone
    this.address = address
}

Card.prototype.pay = function(price) {
    this.top_up = this.top_up - price
    
    return this.top_up
}

Card.prototype.top_up = function(money) {
    this.top_up = money + this.top_up
    return this.top_up
}



gate.forEach(data =>{
    gate_detail.push(new Gate(data))
})

card.forEach(data =>{
    card_detail.push(new Card(data))
})

user.forEach(data =>{
    user_detail.push(new User(data))
}) 

staff.forEach(data =>{
    staff_detail.push(new Staff(data))
})

function create_user(user){
    user_detail.push(new User(user))
    return user
}

function topUp(id_card, top_up){
    let total = 0
    top_up = parseInt(top_up)
    card_detail = card_detail.map((detail) =>{
        if(detail.id_card == id_card) {
            detail.top_up += top_up
            total = detail.top_up
        }
        return detail
    })

    return `Now you have ${total}`
}

function paid(id_card, id_tollGate){
    let total = 0
    let gato = gate_detail.filter((data) =>{
        return id_tollGate == data.id
    })

    card_detail = card_detail.map((detail) =>{
        if(detail.id_card == id_card) {
            detail.top_up -= gato[0].price
            total = detail.top_up
        }
        return detail
    })
    return `Now you have ${total}`
}

function get_gate(){
    return gate_detail
}

function create_staff(n_staff){
    staff_detail.push(new Staff(n_staff))
    return n_staff
}

module.exports = {
    create_user,
    topUp,
    paid,
    get_gate,
    create_staff
}


