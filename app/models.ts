export type model = {
    title: string,
    desc: string
}

export type sessionContextType = {
    session: boolean,
    useSession: (val: boolean) => void
} 