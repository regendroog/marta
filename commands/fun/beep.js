module.exports = {
	name: 'test',
	description: 'Penisair',
	execute(message) {

		let myArray = [
			"one", 
			"two", 
			"three", 
			"four"
		];

        for(let i = 0; i < myArray.length; i++) {
			message.channel.send(myArray[i]);
		}
	},
};



