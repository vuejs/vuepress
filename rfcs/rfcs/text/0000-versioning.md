- Start Date: 2019-11-12
- RFC PR: (leave this empty)
- VuePress Issue: (leave this empty)

# Summary

Support for different versions of documentation.  

This is really just a very rough RFC for a feature request that already has several potential solutions discussed in [issue #1018](https://github.com/vuejs/vuepress/issues/1018).  Because details are already covered in that issue, and this proposal isn't providing one of those as "the" solution, this is really more of a draft for someone (hopefully on the VuePress team) to expand on as decisions are made. 

# Basic example

No proposed API provided, because there are multiple ways to reach the goal.

# Motivation

Documentation is frequently provided for software which itself has different versions.  
When multiple versions of software is supported, it is appropriate to have corresponding versions of documentation.

# Detailed design

There are several different approaches provided —varing from rough idea up to initial implementations— in issue [#1018](https://github.com/vuejs/vuepress/issues/1018).  

Some of the key approaches are:
- @robsontenorio's - ["version script to cut a new documentation version based on the latest content in the docs directory"](https://github.com/vuejs/vuepress/issues/1018#issue-381856602)
  - [more details and draft implementation](https://github.com/vuejs/vuepress/issues/1018#issuecomment-440248700)
  - [yet more details](https://github.com/vuejs/vuepress/issues/1018#issuecomment-534528941)
- @janvennemann's - [plugin, copies "current" directory to "version", supports "unversioned" pages](https://github.com/vuejs/vuepress/issues/1018#issuecomment-516343975)
  - discussion follows for several comments after janvennemann's initial post
- @about-code's - [using git tags for versioning](https://github.com/vuejs/vuepress/issues/1018#issuecomment-533881662)
  - [incremental steps from manual directories to git tagged directories](https://github.com/vuejs/vuepress/issues/1018#issuecomment-534822438)


# Drawbacks

Depending on the implementation choosen, there _could_ be breaking changes.


# Adoption strategy

Depends on the approach selected.

# How we teach this

> What names and terminology work best for these concepts and why? How is this idea best presented? As a continuation of existing VuePress patterns?

> Would the acceptance of this proposal mean the VuePress documentation must be re-organized or altered?  

If applied to VuePress itself, this would allow VuePress documentation to also be versioned.

> Does it change how VuePress is taught to new developers at any level?

> How should this feature be taught to existing VuePress developers?

# Unresolved questions

All of this is TBD
