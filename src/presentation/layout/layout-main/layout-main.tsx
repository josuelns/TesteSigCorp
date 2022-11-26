import React from 'react'

type Props = {
  Header: React.FC
  Search: React.FC
  Content: React.FC
  Footer: React.FC
}

const Layout: React.FC<Props> = ({ Header, Search, Content, Footer }: Props) => {
  return (
    <div>
        <header>
          <Header />
        </header>
        <div>
          <Search />
        </div>
        <div>
          <Content />
        </div>
        <footer>
          <Footer />
        </footer>
    </div>
  )
}

export default Layout
