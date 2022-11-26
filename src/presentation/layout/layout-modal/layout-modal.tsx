import React from 'react'

type Props = {
  Header: React.FC
  Content: React.FC
  Footer: React.FC
}

const Layout: React.FC<Props> = ({ Header, Content, Footer }: Props) => {
  return (
    <div>
        <header>
            <Header />
        </header>
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
