import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
  <Link {...props}>
    <a
      className={`inline-flex items-center font-[600] px-1 pt-1 m-1 text-sm  font-light text-white
            ${
              active
                ? 'font-[900] text-slate-200 '
                : 'font-[200] text-slate-200'
            }`}>
      {children}
    </a>
  </Link>
)

export default NavLink
