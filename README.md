# liaoliao-server

Server Side For 
- [liaoliao](https://github.com/cappuuuuuu/liaoliao)
- [liaoliao-admin](https://github.com/cappuuuuuu/liaoliao-admin)

### API
| Description             | Method | Token    | Path            | Request Parameter  (JSON)                                               |
| ----------------------- | ------ | -------- | --------------- | ----------------------------------------------------------------- |
| Admin login             | POST   |          | /admin/login    | `account: String \| Required` <br> `password: String \| Required` |
| Admin logout            | POST   |          | /admin/logout   | `_id: String \| Requried`                                         |
| Get operator infomation | GET    | Required | /admin/operator |                                                                   |
| Get message history     | GET    | Required | /message        | `page: Required` <br> `count: Required`                           |
| Delete message history  | DELETE | Required | /message        | `_id: Array \| Required`                                          |

### API Response Format

- ✅  Success Response 
```
{
   "status": "success",
   "data": {
      /* Application-specific data would go here. */
   },
   "message": null /* Or optional success message */
}
```
- ❌  Error Response
```
{
  "status": "error",
  "code": 404,
  "data": null, /* or optional error payload */
  "message": "Error xyz has occurred"
}
```
