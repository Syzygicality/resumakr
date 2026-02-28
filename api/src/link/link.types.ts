import { Link } from "../user/user.types"

export type LinkCreate = Pick<Link, "linkName" | "link">

export type LinkUpdate = Partial<
    LinkCreate
>