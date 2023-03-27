
# M(icah).A(very).D(wight). Collected

1.	Problem Statement:
a.	When you are a collector looking to expand your community for more potential collections to view, trade, purchase, sale and geek over, you want a place that provides all this in one site.
b.	Existing sites are usually limited to either the purchase or sale, but if you want to comment and communicate directly, you can set up ways to do that, including proximity meetups.
c.	Finding more than one collective on a site, most sites are collection specific.
2.	Technical Solution:
a.	Create an application that allows users to share existing items and information, for either view only, sale or purchase for specific matching categories.
i.	User 1 is excited about a new item obtained recently for their collection and want the world to see it, comment and enjoy his geeking.  They can share photos, ask for feedback, see if anyone has something similar by submitting to at their item to the site.
b.	The application will allow new categories to be introduced was admin approved.
i.	User 2 joins the site and notices they collect postage stamps, but there isn’t a category listed.  The user request to add Stamp Collecting to the site, so they can build a community and be the first to post.
3.	Glossary:
a.	Site Admins
i.	Administrators who have access to existing comment and approves new content
b.	Members
i.	Users who have view access only (guest), and user who can add and modify view new items, commenting, merchandising.
c.	Collection Category
i.	New community groups based on the collection item type (baseball cards, postage stamps, bugs, etc)
d.	Item
i.	Specific item being uploaded to site and explicitly stated for sharing only (view), trade, sell or purchase.
e.	Comment
i.	Provide users to comment on items, share thoughts and ideas specific to items.
4.	High Level Requirements:
a.	Create a Category
i.	Admin – CRUD
b.	Create an Item
i.	Admin – CRUD
ii.	Members – Read/Update
1.	Delete if authenticated owner of item
c.	Create Comment
i.	Admin – CRUD
ii.	Members – Create/Read/Update
iii.	Guests – Read
d.	Browse Categories/Items/Comments
i.	Anyone
e.	Submit for new category
i.	Members
f.	Apply for membership
i.	Anyone
g.	Approve Membership
i.	Admin
5.	User Stories/Scenarios
a.	As a guest, I can view this website for information on collectibles.  I will have view access only to existing categories, existing items and comments.  If I attempt to add a category, item or comment, I will be re-directed to the member application page and will have to authenticate.
b.	As a member, I can view this website for information on collectibles.  I will have view access to the whole site, similar to that of a guest.  As a member, I can authenticate and login which provides access to any person items I have listed.  Additionally, I can interact with other categories/items/comments by reading and updating access.  Specifically, to any items I have listed, I can also choose to delete.  I can also, request a new category be added to the site.  As a member, I have access to other members contact information and am able to reach out regarding specific items of interest, regardless of category.
c.	As an admin, I can view, add, edit, delete and approve requests for the entire of the site and its functions.  Membership, Categories, Items, Comments and all associated approvals/restrictions are granted permission after authentication.
