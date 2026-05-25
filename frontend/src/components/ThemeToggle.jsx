function ThemeToggle({ darkMode, setDarkMode }) {

  const handleToggle = () => {
    if (setDarkMode) {
      setDarkMode(!darkMode)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="bg-purple-600 px-5 py-2 rounded-xl hover:bg-purple-700"
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>
  )
}

export default ThemeToggle