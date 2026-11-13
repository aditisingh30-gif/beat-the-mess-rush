import { useMemo, useState, type ReactNode } from "react"

type Screen = "select" | "home" | "queue" | "menu" | "staff" | "alert"
type Meal = "Breakfast" | "Lunch" | "Snacks" | "Dinner"
type Availability = "Available" | "Limited" | "Finished"

const messes = [
  { name: "Mess 1", block: "Block A", distance: "2 min walk" },
  { name: "Mess 2", block: "Block B", distance: "5 min walk" },
  { name: "Mess 3", block: "Block C", distance: "7 min walk" },
  { name: "Mess 4", block: "Block D", distance: "9 min walk" },
]

const menus: Record<Meal, {
  name: string
  detail: string
  status: Availability
  icon: IconName
}[]> = {
  Breakfast: [
    {
      name: "Aloo Paratha",
      detail: "With curd & pickle",
      status: "Available",
      icon: "plate",
    },
    {
      name: "Masala Chai",
      detail: "Freshly brewed",
      status: "Available",
      icon: "cup",
    },
    {
      name: "Fresh Fruit",
      detail: "Seasonal selection",
      status: "Limited",
      icon: "fruit",
    },
  ],
  Lunch: [
    {
      name: "Rajma Chawal",
      detail: "With garden salad",
      status: "Available",
      icon: "bowl",
    },
    {
      name: "Mixed Roti",
      detail: "Whole wheat",
      status: "Limited",
      icon: "plate",
    },
    {
      name: "Rice Kheer",
      detail: "Chef’s special",
      status: "Finished",
      icon: "cup",
    },
  ],
  Snacks: [
    {
      name: "Veg Sandwich",
      detail: "Grilled with mint chutney",
      status: "Available",
      icon: "plate",
    },
    {
      name: "Samosa",
      detail: "Fresh from the counter",
      status: "Limited",
      icon: "fruit",
    },
    {
      name: "Cold Coffee",
      detail: "Chilled and lightly sweetened",
      status: "Available",
      icon: "cup",
    },
  ],
  Dinner: [
    {
      name: "Shahi Paneer",
      detail: "With jeera rice",
      status: "Available",
      icon: "bowl",
    },
    {
      name: "Dal Tadka",
      detail: "Slow cooked lentils",
      status: "Available",
      icon: "plate",
    },
    {
      name: "Gulab Jamun",
      detail: "Two pieces",
      status: "Limited",
      icon: "fruit",
    },
  ],
}

type IconName = "arrow" | "bell" | "bowl" | "check" | "chevron" | "clock" | "cup" | "food" | "fruit" | "home" | "menu" | "people" | "person" | "plate" | "queue" | "spark" | "warning"

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="m15 18-6-6 6-6" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    bowl: (
      <>
        <path d="M4 10h16a8 8 0 0 1-16 0Z" />
        <path d="M8 4c0 2 2 2 2 4M14 3c0 2 2 2 2 4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    cup: (
      <>
        <path d="M5 8h12v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
        <path d="M17 10h1a3 3 0 0 1 0 6h-1M8 4v2M12 3v3" />
      </>
    ),
    food: (
      <>
        <path d="M7 3v8M4 3v4a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c4 2 4 8 0 10" />
      </>
    ),
    fruit: (
      <>
        <path d="M12 8c-5-3-9 1-8 6 1 5 5 7 8 5 3 2 7 0 8-5 1-5-3-9-8-6Z" />
        <path d="M12 8c0-3 2-5 5-5M12 7c-2-2-4-2-6-1" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    menu: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <circle cx="3" cy="6" r=".5" fill="currentColor" />
        <circle cx="3" cy="12" r=".5" fill="currentColor" />
        <circle cx="3" cy="18" r=".5" fill="currentColor" />
      </>
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M7 21v-4a5 5 0 0 1 10 0v4M9 21v-4M15 21v-4" />
      </>
    ),
    plate: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
      </>
    ),
    queue: (
      <>
        <circle cx="7" cy="6" r="2" />
        <circle cx="17" cy="6" r="2" />
        <path d="M3 14a4 4 0 0 1 8 0v3H3v-3ZM13 14a4 4 0 0 1 8 0v3h-8v-3ZM6 21h12" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
      </>
    ),
    warning: (
      <>
        <path d="M10.3 3.8 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.8a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  disabled = false,
}: {
  children: ReactNode
  onClick: () => void
  variant?: "primary" | "secondary" | "ghost"
  icon?: IconName
  disabled?: boolean
}) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {icon && <Icon name={icon} size={18} />}
    </button>
  )
}

function Badge({
  children,
  tone,
}: {
  children: ReactNode
  tone: "green" | "red" | "amber" | "blue" | "gray"
}) {
  return (
    <span className={`badge ${tone}`}>
      <span className="badge-dot" />
      {children}
    </span>
  )
}

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <Icon name="food" size={24} />
        <span className="brand-speed" />
      </div>
      <div>
        <strong>Beat the</strong>
        <span>Mess Rush</span>
      </div>
    </div>
  )
}

function ScreenHeader({
  title,
  subtitle,
  onBack,
  action,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
  action?: ReactNode
}) {
  return (
    <header className="screen-header">
      {onBack ? (
        <button className="icon-button" onClick={onBack} aria-label="Go back">
          <Icon name="arrow" />
        </button>
      ) : (
        <Brand />
      )}
      <div className="screen-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action || (onBack ? <span className="header-spacer" /> : null)}
    </header>
  )
}

function BottomNav({
  active,
  navigate,
}: {
  active: "home" | "queue" | "menu" | "profile"
  navigate: (screen: Screen) => void
}) {
  const items: {
    label: string
    icon: IconName
    value: typeof active
    target: Screen
  }[] = [
    { label: "Home", icon: "home", value: "home", target: "home" },
    { label: "Queue", icon: "queue", value: "queue", target: "queue" },
    { label: "Menu", icon: "menu", value: "menu", target: "menu" },
    { label: "Profile", icon: "person", value: "profile", target: "staff" },
  ]
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.value}
          className={active === item.value ? "active" : ""}
          onClick={() => navigate(item.target)}
        >
          <Icon name={item.icon} size={21} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function SelectionScreen({
  selected,
  setSelected,
  onContinue,
}: {
  selected: number
  setSelected: (i: number) => void
  onContinue: () => void
}) {
  const [studentName, setStudentName] = useState("")
  const [hostel, setHostel] = useState("Boys Hostel 1")
  return (
    <main className="screen selection-screen">
      <div className="selection-top">
        <Brand />
        <div className="onboarding-art">
          <div className="sun">
            <Icon name="spark" size={28} />
          </div>
          <div className="building">
            <span />
            <span />
            <span />
            <div className="awning" />
            <div className="door" />
          </div>
          <div className="art-person">
            <Icon name="person" size={35} />
          </div>
        </div>
        <div className="welcome-copy">
          <span className="eyebrow">Welcome to campus dining</span>
          <h1>Skip the rush. Enjoy your meal.</h1>
          <p>Tell us where you dine to personalize your demo experience.</p>
        </div>
      </div>
      <div className="onboarding-form">
        <label>
          <span>Student name</span>
          <input
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <label>
          <span>Hostel block</span>
          <select
            value={hostel}
            onChange={(event) => setHostel(event.target.value)}
          >
            <option>Boys Hostel 1</option>
            <option>Boys Hostel 4</option>
            <option>Girls Hostel 2</option>
            <option>Girls Hostel 5</option>
          </select>
        </label>
        <label>
          <span>Preferred mess</span>
          <select
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
          >
            <option value={-1}>Select an LPU mess</option>
            {messes.map((mess, index) => (
              <option key={mess.name} value={index}>
                {mess.name} — {mess.block}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Button onClick={onContinue} icon="chevron" disabled={selected < 0}>
        Continue
      </Button>
      {selected < 0 && (
        <p className="selection-help">Select a preferred mess to continue.</p>
      )}
      <p className="sample-note">
        Prototype uses illustrative sample data only.
      </p>
    </main>
  )
}

function HomeScreen({
  mess,
  navigate,
}: {
  mess: typeof messes[number]
  navigate: (s: Screen) => void
}) {
  return (
    <main className="screen home-screen">
      <div className="home-top">
        <ScreenHeader
          title=""
          action={
            <button
              className="notification"
              onClick={() => navigate("alert")}
              aria-label="Open crowd alert"
            >
              <Icon name="bell" />
              <span />
            </button>
          }
        />
        <div className="greeting">
          <div>
            <p>Hello, Student!</p>
            <h1>
              {mess.name} <span>· {mess.block}</span>
            </h1>
          </div>
          <div className="avatar">ST</div>
        </div>
        <div className="sample-strip">
          <span>Demo information</span> Last updated today, 1:08 PM
        </div>
        <div className="crowd-cards" aria-label="Crowd status scale">
          <div className="crowd-card low">
            <span />
            <small>Low Crowd</small>
          </div>
          <div className="crowd-card moderate active">
            <span />
            <small>Moderate Crowd</small>
          </div>
          <div className="crowd-card high">
            <span />
            <small>High Crowd</small>
          </div>
        </div>
        <button className="hero-status" onClick={() => navigate("queue")}>
          <div className="hero-copy">
            <span className="meal-label">Lunch · serving now</span>
            <h2>Good time to go</h2>
            <p>The queue is moving steadily.</p>
            <span className="view-link">
              View live queue <Icon name="chevron" size={16} />
            </span>
          </div>
          <div className="status-orbit">
            <span className="orbit-ring" />
            <div>
              <Icon name="people" size={28} />
              <strong>Moderate</strong>
            </div>
          </div>
        </button>
      </div>
      <section className="home-content">
        <div className="stat-row">
          <button className="stat-card" onClick={() => navigate("queue")}>
            <span className="stat-icon blue">
              <Icon name="clock" />
            </span>
            <span>
              <small>Est. wait</small>
              <strong>12 min</strong>
            </span>
          </button>
          <button className="stat-card" onClick={() => navigate("menu")}>
            <span className="stat-icon green">
              <Icon name="food" />
            </span>
            <span>
              <small>Food status</small>
              <strong>Available</strong>
            </span>
          </button>
        </div>
        <div className="quick-actions">
          <button onClick={() => navigate("queue")}>
            <Icon name="queue" />
            <span>View Live Queue</span>
          </button>
          <button onClick={() => navigate("menu")}>
            <Icon name="menu" />
            <span>View Menu</span>
          </button>
          <button onClick={() => navigate("menu")}>
            <Icon name="bell" />
            <span>Set Meal Reminder</span>
          </button>
        </div>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Today’s lunch</span>
            <h2>What’s on the menu</h2>
          </div>
          <button onClick={() => navigate("menu")}>See all</button>
        </div>
        <button className="menu-preview" onClick={() => navigate("menu")}>
          <div className="food-visual">
            <Icon name="bowl" size={36} />
          </div>
          <div>
            <h3>Rajma Chawal</h3>
            <p>With salad & fresh roti</p>
            <Badge tone="green">Available</Badge>
          </div>
          <Icon name="chevron" />
        </button>
        <div className="tip-card">
          <span>
            <Icon name="spark" />
          </span>
          <div>
            <strong>Beat the rush</strong>
            <p>Lunch is usually quieter after 1:45 PM.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function QueueScreen({
  mess,
  navigate,
}: {
  mess: typeof messes[number]
  navigate: (s: Screen) => void
}) {
  return (
    <main className="screen content-screen">
      <ScreenHeader
        title="Live Queue Status"
        subtitle={`${mess.name} · ${mess.block}`}
        onBack={() => navigate("home")}
        action={<Badge tone="red">High</Badge>}
      />
      <div className="queue-hero">
        <div className="queue-visual">
          <div className="queue-people">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={i > 8 ? "muted" : ""}>
                <Icon name="person" size={24} />
              </span>
            ))}
          </div>
          <div className="counter">
            <Icon name="food" size={26} />
            <small>Serving</small>
          </div>
        </div>
        <div className="queue-summary">
          <Badge tone="red">High crowd</Badge>
          <h2>
            <strong>25</strong> minutes
          </h2>
          <p>Estimated waiting time</p>
        </div>
      </div>
      <div className="queue-count">
        <Icon name="people" size={21} />
        <strong>12 people in queue</strong>
        <span>Demo count</span>
      </div>
      <div className="busy-message">
        <span>
          <Icon name="warning" />
        </span>
        <div>
          <strong>Mess is currently busy</strong>
          <p>Consider waiting a little before you leave.</p>
        </div>
      </div>
      <section className="detail-card">
        <h3>Queue details</h3>
        <div className="detail-row">
          <span className="detail-icon">
            <Icon name="people" />
          </span>
          <div>
            <small>Crowd level</small>
            <strong>High</strong>
          </div>
          <Badge tone="red">Busy</Badge>
        </div>
        <div className="detail-row">
          <span className="detail-icon">
            <Icon name="clock" />
          </span>
          <div>
            <small>Peak hours</small>
            <strong>12:45 – 1:30 PM</strong>
          </div>
        </div>
        <div className="detail-row">
          <span className="detail-icon">
            <Icon name="spark" />
          </span>
          <div>
            <small>Best time to visit</small>
            <strong>After 1:45 PM</strong>
          </div>
        </div>
      </section>
      <section className="crowd-legend">
        <strong>Crowd status guide</strong>
        <div>
          <span className="low">Low</span>
          <span className="moderate">Moderate</span>
          <span className="high">High</span>
        </div>
      </section>
      <p className="updated">Demo information · Last updated today, 1:08 PM</p>
      <div className="screen-actions">
        <Button onClick={() => navigate("alert")} icon="warning">
          View crowd alert
        </Button>
        <Button variant="secondary" onClick={() => navigate("home")}>
          Back to Home
        </Button>
      </div>
    </main>
  )
}

function MenuScreen({
  mess,
  navigate,
}: {
  mess: typeof messes[number]
  navigate: (s: Screen) => void
}) {
  const [meal, setMeal] = useState<Meal>("Lunch")
  const [reminder, setReminder] = useState("30 minutes before")
  const [confirmed, setConfirmed] = useState(false)
  return (
    <main className="screen content-screen menu-screen">
      <ScreenHeader
        title="Today’s Menu"
        subtitle={`${mess.name} · ${mess.block}`}
        onBack={() => navigate("home")}
      />
      <div className="meal-tabs">
        {(["Breakfast", "Lunch", "Snacks", "Dinner"] as Meal[]).map((item) => (
          <button
            key={item}
            className={meal === item ? "active" : ""}
            onClick={() => {
              setMeal(item)
              setConfirmed(false)
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="menu-list">
        <div className="section-heading compact">
          <div>
            <span className="eyebrow">{meal}</span>
            <h2>Freshly prepared today</h2>
          </div>
          <Badge tone="gray">
            {meal === "Breakfast"
              ? "7:00–9:30 AM"
              : meal === "Lunch"
                ? "12:00–2:30 PM"
                : meal === "Snacks"
                  ? "4:30–6:00 PM"
                  : "7:30–10:00 PM"}
          </Badge>
        </div>
        {menus[meal].map((item) => (
          <article className="food-card" key={item.name}>
            <div className="food-icon">
              <Icon name={item.icon} size={27} />
            </div>
            <div>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
            </div>
            <Badge
              tone={
                item.status === "Available"
                  ? "green"
                  : item.status === "Limited"
                    ? "amber"
                    : "gray"
              }
            >
              {item.status}
            </Badge>
          </article>
        ))}
      </div>
      <section className={`reminder-card ${confirmed ? "confirmed" : ""}`}>
        {confirmed ? (
          <div className="confirmation">
            <span>
              <Icon name="check" size={26} />
            </span>
            <div>
              <h3>Reminder set!</h3>
              <p>We’ll remind you {reminder.toLowerCase()}.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="reminder-title">
              <span>
                <Icon name="bell" />
              </span>
              <div>
                <h3>Meal reminder</h3>
                <p>Get a nudge before {meal.toLowerCase()}.</p>
              </div>
            </div>
            <div className="reminder-options">
              {["1 hour before", "30 minutes before", "At meal time"].map(
                (option) => (
                  <button
                    key={option}
                    className={reminder === option ? "active" : ""}
                    onClick={() => setReminder(option)}
                  >
                    <span className="radio">
                      {reminder === option && <span />}
                    </span>
                    {option}
                  </button>
                ),
              )}
            </div>
            <Button onClick={() => setConfirmed(true)} icon="bell">
              Set Reminder
            </Button>
          </>
        )}
      </section>
      <Button variant="ghost" onClick={() => navigate("home")}>
        Back to Home
      </Button>
      <p className="updated">Demo menu · Last updated today, 1:08 PM</p>
    </main>
  )
}

function StaffScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [foodStatus, setFoodStatus] = useState<Availability>("Available")
  const [crowd, setCrowd] = useState("Moderate")
  const [waitingTime, setWaitingTime] = useState("12")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  return (
    <main className="screen content-screen staff-screen">
      <ScreenHeader
        title="Staff Dashboard"
        subtitle="Simulated update portal"
        onBack={() => navigate("home")}
        action={<span className="staff-chip">STAFF</span>}
      />
      <div className="staff-intro">
        <span>
          <Icon name="spark" />
        </span>
        <div>
          <h2>Service update</h2>
          <p>Keep students informed with the latest dining status.</p>
        </div>
      </div>
      {submitted && (
        <div className="success-banner">
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>Update submitted</strong>
            <p>The simulated mess status was updated successfully.</p>
          </div>
          <button onClick={() => setSubmitted(false)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const parsedTime = Number(waitingTime)
          if (
            waitingTime.trim() === "" ||
            !Number.isFinite(parsedTime) ||
            parsedTime < 0 ||
            parsedTime > 180
          ) {
            setError("Enter a waiting time from 0 to 180 minutes.")
            setSubmitted(false)
            return
          }
          setError("")
          setSubmitted(true)
        }}
      >
        <div className="field-row">
          <label>
            <span>Campus mess</span>
            <select>
              <option>Mess 1 — Block A</option>
              <option>Mess 2 — Block B</option>
              <option>Mess 3 — Block C</option>
              <option>Mess 4 — Block D</option>
            </select>
          </label>
          <label>
            <span>Meal</span>
            <select>
              <option>Lunch</option>
              <option>Breakfast</option>
              <option>Dinner</option>
            </select>
          </label>
        </div>
        <section className="form-section">
          <h3>Crowd Status</h3>
          <fieldset>
            <legend>Current crowd level</legend>
            <div className="segmented three crowd">
              {["Low", "Moderate", "High"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={crowd === item ? "active" : ""}
                  onClick={() => setCrowd(item)}
                >
                  <span />
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            <span>Estimated waiting time</span>
            <div className="input-suffix">
              <input
                type="number"
                value={waitingTime}
                onChange={(event) => {
                  setWaitingTime(event.target.value)
                  setError("")
                }}
                min="0"
                max="180"
              />
              <span>minutes</span>
            </div>
          </label>
          {error && <p className="form-error">{error}</p>}
        </section>
        <section className="form-section">
          <h3>Food Availability</h3>
          <label>
            <span>Food item name</span>
            <input defaultValue="Rajma Chawal" placeholder="Enter food item" />
          </label>
          <fieldset>
            <legend>Availability</legend>
            <div className="segmented three">
              {(["Available", "Limited", "Finished"] as Availability[]).map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    className={foodStatus === item ? "active" : ""}
                    onClick={() => setFoodStatus(item)}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </fieldset>
        </section>
        <button className="button primary submit-button" type="submit">
          Submit Update
          <Icon name="check" size={18} />
        </button>
      </form>
      <p className="updated">
        This is a simulated staff interface. No data is sent.
      </p>
    </main>
  )
}

function AlertScreen({
  mess,
  navigate,
}: {
  mess: typeof messes[number]
  navigate: (s: Screen) => void
}) {
  return (
    <main className="screen alert-screen">
      <ScreenHeader title="" onBack={() => navigate("queue")} />
      <div className="alert-illustration">
        <span className="alert-ring" />
        <span className="alert-ring second" />
        <div>
          <Icon name="warning" size={44} />
        </div>
      </div>
      <div className="alert-copy">
        <span className="eyebrow red-text">Demo notification</span>
        <h1>Mess Alert!</h1>
        <h2>
          {mess.name} · {mess.block}
        </h2>
        <p>
          High crowd and limited food availability are being simulated for this
          mess.
        </p>
      </div>
      <section className="alert-stats">
        <div>
          <span className="stat-icon red">
            <Icon name="people" />
          </span>
          <span>
            <small>Current crowd</small>
            <strong>High</strong>
          </span>
        </div>
        <div>
          <span className="stat-icon amber">
            <Icon name="clock" />
          </span>
          <span>
            <small>Estimated wait</small>
            <strong>25 min</strong>
          </span>
        </div>
      </section>
      <div className="food-warning">
        <Icon name="food" />
        <div>
          <strong>Food availability is limited</strong>
          <p>Popular lunch items may run out soon.</p>
        </div>
      </div>
      <p className="alert-timestamp">
        Timestamp: Today, 1:08 PM · Demo information
      </p>
      <div className="suggestion">
        <span>
          <Icon name="spark" />
        </span>
        <p>
          <strong>Our suggestion</strong>Consider visiting another mess or
          checking again later.
        </p>
      </div>
      <div className="alert-actions">
        <Button onClick={() => navigate("select")} icon="chevron">
          Check Another Mess
        </Button>
        <Button variant="secondary" onClick={() => navigate("home")}>
          Return to Home
        </Button>
      </div>
      <p className="sample-note">
        Illustrative sample alert · Not real-time LPU information
      </p>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("select")
  const [selectedMess, setSelectedMess] = useState(-1)
  const currentMess = useMemo(
    () => messes[selectedMess] ?? messes[0],
    [selectedMess],
  )

  const renderScreen = () => {
    if (screen === "select")
      return (
        <SelectionScreen
          selected={selectedMess}
          setSelected={setSelectedMess}
          onContinue={() => setScreen("home")}
        />
      )
    if (screen === "home")
      return <HomeScreen mess={currentMess} navigate={setScreen} />
    if (screen === "queue")
      return <QueueScreen mess={currentMess} navigate={setScreen} />
    if (screen === "menu")
      return <MenuScreen mess={currentMess} navigate={setScreen} />
    if (screen === "staff") return <StaffScreen navigate={setScreen} />
    return <AlertScreen mess={currentMess} navigate={setScreen} />
  }

  const activeStudentTab =
    screen === "home" || screen === "queue" || screen === "menu" ? screen : null

  return (
    <div className="app-shell">
      <div className="phone-frame">
        {renderScreen()}
        {activeStudentTab && (
          <BottomNav active={activeStudentTab} navigate={setScreen} />
        )}
      </div>
    </div>
  )
}
