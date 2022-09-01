const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const changeCover = async () => {
    try {
        const databaseId = process.env.NOTION_DATABASE_ID;
        const {results} = await notion.databases.query({
          database_id: databaseId,
          page_size: 100,
          sorts: [
            {
              property: 'Created time',
              direction: 'ascending',
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
                        url: 'https://images.unsplash.com/photo-1661329740220-446be722e3fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
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