const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const changeCover = async (url) => {
    try {
      console.log(url);
        const databaseId = process.env.NOTION_DATABASE_ID;
        const {results} = await notion.databases.query({
          database_id: databaseId,
          page_size: 100,
          sorts: [
            {
              property: 'Created time',
              direction: 'descending',
            },
          ],
        });

        const lastEditedPage = results[0]?.id;
        if(typeof lastEditedPage === undefined) console.error('page is undefined')
        else {
            await notion.pages.update({
                page_id: lastEditedPage,
                cover: {
                    type: 'external',
                    external: {
                        url,
                    }
                }
            })
        }

        return 'cover set successfully'

    } catch (error) {
        console.error(error);

        return 'there was an unexpected error (very helpfull, i know)'
    }
  };

module.exports = {notion, changeCover};