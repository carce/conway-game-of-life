const chai = require('chai')

const Conway = require('../src/conway')

chai.should()

describe('Conway', () => {
    it('should construct a matrix of zeroes and ones', () => {
        let game = new Conway(100, 100)

        game.map
        .should.be.an('array')
        .and.have.lengthOf(100)

        game.map.forEach(row => {
            row.forEach(value => {
                value.should.match(/[01]/)
            })
        })
    })

    it('should calculate next step as expected', () => {
        const expected = [
            [ 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 1 ],
            [ 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0 ]
        ]

        let game = new Conway(5, 5);

        game.map = [
            [ 0, 0, 0, 0, 1 ],
            [ 1, 1, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 1 ]
        ]

        game.step()

        game.map.should.deep.equal(expected);
    })
})