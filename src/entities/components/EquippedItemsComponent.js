import Component from './Component.js'

export default class EquippedItemsComponent extends Component {
    constructor(entity) {
        super(entity)
        this.head = false
        this.chest = false
        this.feet = false
        this.hands = false
        this.weapon = false
    }

    update() {

    }

    getEquipmentAtk() {
        return this.getAllEquipment().reduce((accumulator, eq) => accumulator + eq.getAtk())
    }

    getEquipmentMatk() {
        return this.getAllEquipment().reduce((accumulator, eq) => accumulator + eq.getMatk())
    }

    getEquipmentDef() {
        return this.getAllEquipment().reduce((accumulator, eq) => accumulator + eq.getDef())
    }

    getEquipmentMdef() {
        return this.getAllEquipment().reduce((accumulator, eq) => accumulator + eq.getMdef())
    }

    getHead() {
        return this.head
    }

    getChest() {
        return this.chest
    }

    getFeet() {
        return this.feet
    }

    getHands() {
        return this.hands
    }

    getWeapon() {
        return this.weapon
    }

    equip(eq) {
        switch (eq.type) {
            case 'head':
                this.equipHead(eq)
                break
            case 'chest':
                this.equipChest(eq)
                break
            case 'feet':
                this.equipFeet(eq)
                break
            case 'hands':
                this.equipHands(eq)
                break
            default:
            case 'weapon':
                this.equipWeapon(eq)
                break
        }
    }

    equipHead(eq) {
        this.head = eq
    }

    equipChest(eq) {
        this.chest = eq
    }

    equipFeet(eq) {
        this.feet = eq
    }

    equipHands(eq) {
        this.hands = eq
    }

    equipWeapon(eq) {
        this.weapon = eq
    }

    getAllEquipment() {
        const equipments = [this.head, this.chest, this.feet, this.hands, this.weapon]
        return equipments.filter(eq => eq !== false)
    }
}