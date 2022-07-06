const dummyData = [
  {
    photoURL:
      "https://images.pexels.com/photos/1508336/pexels-photo-1508336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    scripName: "RELIENCE",
    amountInvested: "32424",
    amountTime: "32:43"
  },
  {
    photoURL:
      "https://images.pexels.com/photos/1508336/pexels-photo-1508336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    scripName: "RELIENCE",
    amountInvested: "32424",
    amountTime: "32:43"
  }
];

exports.handler = async event => {

	return {
		statusCode: 200,
		body: JSON.stringify(dummyData)
	}	
}
