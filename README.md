# Github Comment Manager [![npm version](https://badge.fury.io/js/github-comment-manager.svg)](https://badge.fury.io/js/github-comment-manager)

### Brought to you by The Times Tooling team  🛠

## Overview

The Github Comment Manager makes interacting with Github comments easier.
This module exposes four functions allowing you to create, read, update and remove comments.

### Functions

#### Create

The create function will create a single review comment on a Github pull request.

```
import { create } from 'github-comment-manager';

create.comment({token, repository, account, pullRequest, comment});
```

| Parameter   | Description                                 |
| ----------- | ------------------------------------------- |
| token       | Github account access token                 |
| repository  | Repository to comment on                    |
| account     | Github account where the repository resides |
| pullRequest | Pull request number to add the comment to   |
| comment     | Comment text                                |

#### Read

The read function will return a list of review comments on a pull request.

```
import { read } from 'github-comment-manager';

read.comments({token, repository, account, pullRequest});
```

| Parameter   | Description                                 |
| ----------- | ------------------------------------------- |
| token       | Github account access token                 |
| repository  | Repository to retrieve comments from        |
| account     | Github account where the repository resides |
| pullRequest | Pull request number to read comments from   |

The example response can be found [HERE](https://developer.github.com/v3/issues/comments/#response).

#### Update

The update function will update a specific review comment on a Github pull request.

```
import { update } from 'github-comment-manager';

update.comment({token, repository, account, commentId, updatedComment});
```

| Parameter      | Description                                 |
| -------------- | ------------------------------------------- |
| token          | Github account access token                 |
| repository     | Repository to update comment on             |
| account        | Github account where the repository resides |
| commentId      | Id of the comment to be updated             |
| updatedComment | Text which the comment will be updated to   |

#### Remove

The remove function will remove a specific review comment on a Github pull request.

```
import { remove } from 'github-comment-manager';

remove.comment({token, repository, account, commentId});
```

| Parameter  | Description                                 |
| ---------- | ------------------------------------------- |
| token      | Github account access token                 |
| repository | Repository to remove comment from           |
| account    | Github account where the repository resides |
| commentId  | Id of the comment to be removed             |

### Contributing

Please see the [contribution document](CONTRIBUTING.MD) for further details.
