const Canvas = require("canvas")
const Discord = require("discord.js")

const canvasDimensions = {
	width: 1200,
	height: 675,
	margin: 50
}

const avatar = {
	size: 256,
	x: 480,
	y: 170
}

const generateImage = async (user) => {
	const username = user.username
	const userdisc = user.discriminator
	const useravat = user.displayAvatarURL({
		format: "png",
		dynamic: false,
		size: avatar.size
	})
	const bgimgurl = "https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&h=675"
	const canvas = Canvas.createCanvas(canvasDimensions.width, canvasDimensions.height)
	const ctx = canvas.getContext("2d")
	const bgimgobj = await Canvas.loadImage(bgimgurl)
	const avimgobj = await Canvas.loadImage(useravat)

	ctx.drawImage(bgimgobj, -96, 0)
	ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
	ctx.fillRect(canvasDimensions.margin, canvasDimensions.margin, canvasDimensions.width - canvasDimensions.margin * 2, canvasDimensions.height - canvasDimensions.margin * 2)

	ctx.save()
	ctx.beginPath()
	ctx.arc(avatar.x + avatar.size / 2, avatar.y + avatar.size / 2, avatar.size / 2, 0, Math.PI * 2, true)
	ctx.closePath()
	ctx.clip()
	ctx.drawImage(avimgobj, avatar.x, avatar.y)
	ctx.restore()

	ctx.fillStyle = "white"
	ctx.textAlign = "center"

	ctx.font = "50px Sans"
	ctx.fillText(`Welcome`, canvasDimensions.width / 2, canvasDimensions.margin + 70)

	ctx.font = "60px Sans"
	ctx.fillText(`${username}#${userdisc}`, canvasDimensions.width / 2, canvasDimensions.height - canvasDimensions.margin - 125)

	ctx.font = "40px Sans"
	ctx.fillText(`to the server`, canvasDimensions.width / 2, canvasDimensions.height - canvasDimensions.margin - 50)

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
	return attachment
}

module.exports = generateImage