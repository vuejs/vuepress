# VuePress RFCs

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are "substantial", and we ask that these be put through a bit of a design process and produce a consensus among the VuePress core team.

The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.

## When to follow this process

You should consider using this process if you intend to make `"substantial"` changes to VuePress or its documentation.

## The RFC life-cycle

- Fork this repo https://github.com/vuejs/vuepress.
- Copy `rfcs/template.md` to `rfcs/text/0000-feature.md` (where 'feature' is descriptive. Don't assign an RFC number yet).
- Fill in the RFC. Put care into the details.
- Submit a pull request.
- Build consensus and integrate feedback. RFCs that have broad support are much more likely to make progress than those that don't receive any comments.
- Finally, the team will decide whether the RFC is a `'candidate'` for inclusion in VuePress.
- Once an RFC becomes `'candidate'`, it will enter a `'final stage'` lasting 7 calendar days.
- An RFC can be **modified** based upon feedback from the team and community.
- An RFC may be **rejected** by the team after public discussion has settled and comments have been made summarizing the rationale for rejection. A member of the team should then close the RFCs associated pull request.
- An RFC may be **accepted** at the close of its `'final stage'`. A team member will merge the RFCs associated pull request, at which point the RFC will become `'active'`.
- Once an RFC becomes `'active'`, a team member will open an issue for the implementation request, then authors may implement it and submit a pull request to the VuePress repo.
- An `'active'` RFC implementation pull request will ONLY be merged when it passes the review of core members. Once the implementation is merged, the corresponding issue will be closed  and the RFC will enter the `'finished'` stage.
- An `'active'` RFC that no one follows in a month will be tagged `'inactive'`. It will remain `'inactive'` unless someone opens a pull request.

## Notes

- The author of an RFC is not obligated to implement it. Of course, the RFC author (like any other developer) is welcome to post an implementation for review after the RFC has been accepted.
- If you are interested in working on the implementation for an `'active'` RFC, but cannot determine if someone else is already working on it, feel free to ask (e.g. by leaving a comment on the associated issue).
- It's worth noting that even if RFC becomes `'active'`, it doesn't mean that the pull request of this implementation will eventually be merged.
- **VuePress's RFC process owes its inspiration to the [Yarn RFC process]**.

[Yarn RFC process]: https://github.com/yarnpkg/rfcs
