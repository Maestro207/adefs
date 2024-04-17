export type model = {
    title: string,
    desc: string
}

export type sessionContextType = {
    session: boolean,
    setSession: (val: boolean) => void
} 