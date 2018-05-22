# Github Comment Manager

## Overview

The Github Comment Manager makes interacting with Github comments easier.
This module exposes four functions allowing you to create, read, update and remove comments.

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

The update function will update a specific review comment on a Github pull request.

```
import { update } from 'github-comment-manager';

update.comment({account, token, repository, commentId, updatedComment});
```

| Parameter      | Description                               |
| -------------- | ----------------------------------------- |
| account        | Github account username                   |
| token          | Github account access token               |
| repository     | Repository to comment on                  |
| commentId      | Id of the comment to be updated           |
| updatedComment | Text which the comment will be updated to |

#### Remove

The remove function will remove a specific review comment on a Github pull request.

```
import { remove } from 'github-comment-manager';

remove.comment({account, token, repository, commentId});
```

| Parameter      | Description                               |
| -------------- | ----------------------------------------- |
| account        | Github account username                   |
| token          | Github account access token               |
| repository     | Repository to comment on                  |
| commentId      | Id of the comment to be updated           |

### Contributing

Please see the CONTRIBUTING.md for further details.
