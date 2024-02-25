
async function getDocWithAttachments(id) {
    try {
        console.log("image data is here....")
      const doc = await icondb.get(id, {attachments: true});
      console.log('Document:', doc);
      const buffer = Buffer.from(doc._attachments['image.png'].data, 'base64');
      console.log(buffer)
        fs.writeFileSync(`./icon/${exename}.png`, buffer);
    } catch (error) {
      console.error('Error:', error);
    }
  }
