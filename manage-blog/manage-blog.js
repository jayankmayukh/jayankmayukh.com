const fs = require('fs').promises
const readline = require('readline')
const constants = require('./constants')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function question(query) {
    return new Promise((resolve) => {
        rl.question(query, answer => resolve(answer))
    })
}

async function createNewPost(slug, description) {
    let dirPath = constants.BLOG_PATH + slug
    let filePath = `${dirPath}/index.md`
    let dateString = (new Date()).toISOString()
    let title = slug.split('-').join(' ')
    let frontmatter =
        `---\n` +
        `title: "${title}"\n` +
        `date: "${dateString}"\n` +
        (description ? `description: "${description}"\n` : ``) +
        `---`
    try {
        await fs.mkdir(dirPath)
        await fs.writeFile(filePath, frontmatter, { flag: 'wx' })
    } catch (error) {
        if (error.code === 'EEXIST') {
            let answer = await question(constants.SLUG_ALREADY_EXISTS_Q)
            if (answer === 'yes') {
                await fs.writeFile(`${dirPath}/index.md`, frontmatter, { flag: 'w' })
            }
        } else {
            throw error
        }
    }
    return filePath
}

let command = process.argv[2]
if(command === 'create'){
    let [slug, desc] = process.argv.slice(3, 5)

    if (!slug) {
        console.log(constants.INSUFFICIENT_ARGS)
        process.exit(0)
    }

    createNewPost(slug, desc).then((filePath) => {
        console.log(filePath || '')
    }).catch((error) => {
        if (error.code === 'EACCES') {
            console.log(constants.PERMISSION_DENIED)
        } else {
            console.error(error)
        }
    }).finally(() => {
        process.exit(0)
    })
} else {
    console.log(constants.UNKNOWN_COMMAND)
    process.exit(0)
}