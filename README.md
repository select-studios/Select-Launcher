# File Structure

- src-tauri is strictly for business side rust logic.
- src contains all the filthy frontend typescript code.
- src/components is only for reusable components across the application.
- src/pages/pagename contains all the files needed for the working of a page including the page layout itself.
- src/pages/pagename/pagename.tsx contains the layout for the page itself.
- src/pages/pagename/components/ contains all the individual components making up the page itself or the layout components if you will. These are not meant to be reused across the application.
