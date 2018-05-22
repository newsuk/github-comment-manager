# Github Comment Manager

## Overview
The Github Comment Manager makes interacting with Github comments easier.
This module exposes four functions allowing you to create, read, update and delete comments.

### Functions
#### Create
The create function will create a single review comment on a Github pull request.
```
import { create } from 'github-comment-manager';

create.comment({account, token, repository, pullRequest, comment});
```

| Parameter   | Description                               |
| ----------- | ----------------------------------------- |
| account     | Github account username                   |
| token       | Github account access token               |
| repository  | Repository to comment on                  |
| pullRequest | Pull request number to add the comment to |
| comment     | Comment text                              |

#### Read
Usage to be defined.

#### Update
Usage to be defined.

#### Delete
Usage to be defined.

### Contributing
Please see the CONTRIBUTING.md for further details.