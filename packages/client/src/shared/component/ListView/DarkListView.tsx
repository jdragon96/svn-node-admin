// import List from "@mui/material/List";
import { useEffect } from 'react';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';

export interface DarkListViewParam
{
  items: string[]
  itemSelectCallback: (selectedItem: string) => void
}
export const DarkListView = (param: DarkListViewParam) => {

  useEffect(() => 
  {
    console.log(param.items);
  }, [])

  return (
    <>
    <List
     sx={
       {
         background: "#000000",
         height: "100%",
         borderRadius: "2px"
       }}>
      {
        param.items.map((item: string, index: number) => 
        {
          return (
            <ListItem>
              <ListItemButton onClick={(e) => param.itemSelectCallback(item)}>
                {item}
              </ListItemButton>
            </ListItem>
          )
        })
      }
    </List>
    </>
  )
}