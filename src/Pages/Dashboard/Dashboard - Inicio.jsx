import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FiArrowUpRight, FiArrowDownRight, FiLogOut, FiHome, FiBarChart2, FiStar, FiDollarSign, FiBookOpen, FiChevronRight } from 'react-icons/fi';
import { FaFire, FaExclamationCircle, FaGraduationCap } from 'react-icons/fa';

// Mock data, to be replaced with localStorage
const initialUserData = {
  name: 'Eduardo',
  availableBalance: 2450000,
  monthlyIncome: 3240000,
  monthlyExpense: 2050000,
  streak: 32,
  budget: {
    used: 2830000,
    total: 3000000,
    percentage: 88,
    available: 180000,
  },
  goodPace: {
      savingIncrease: 10,
      variableExpensesDecrease: 5,
      emergencyFundPercentage: 65,
  },
  financialGoals: [
      { 
        title: 'Fondo de emergencia', 
        percentage: 70, 
        icon: 'FaExclamationCircle'
      },
      { 
        title: 'Pagar mis estudios', 
        percentage: 50, 
        icon: 'FaGraduationCap'
      },
  ],
  spendingDistribution: {
      total: 2050000,
      categories: [
          { name: 'Alimentos', percentage: 25, color: '#00bcd4'},
          { name: 'Transporte', percentage: 20, color: '#8c9eff'},
          { name: 'Ocio', percentage: 15, color: '#673ab7'},
          { name: 'Vivienda', percentage: 30, color: '#3f51b5'},
          { name: 'Otros', percentage: 10, color: '#cddc39'},
      ]
  },
  products: [
      {
        type: 'credit-card',
        brand: 'VISA Crédito',
        number: '2345',
        holder: 'Eduardo Villamil',
        expiration: '02/30'
      }
  ]
  // ... other data from your design
};

const DashboardInicio = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      localStorage.setItem('userData', JSON.stringify(initialUserData));
      setUserData(initialUserData);
    }
  }, []);

  const { 
    name, 
    availableBalance, 
    monthlyIncome, 
    monthlyExpense, 
    streak,
    budget = {}, 
    goodPace = {}, 
    financialGoals = [], 
    spendingDistribution = {},
    products = []
  } = userData;

    const iconMap = {
        FaExclamationCircle: <FaExclamationCircle />,
        FaGraduationCap: <FaGraduationCap />
    };

  return (
    <div className="dashboard-mobile">
      <header className="header-mobile">
        <div className="profile-area">
            <img src="https://via.placeholder.com/50" alt="Profile" className="profile-pic" />
            <div className="welcome-text">
                <h2>Hola, {name}</h2>
                <p>Bienvenido a tu tablero financiero</p>
            </div>
        </div>
        <div className="header-icons-mobile">
          <div className="streak-icon">
            <FaFire color="white"/>
            <span>{streak ?? 0} días</span>
          </div>
          <button className="logout-icon">
            <FiLogOut />
          </button>
        </div>
      </header>

      <main className="main-content-mobile">
        <div className="card-mobile balance-card">
          <span>Saldo disponible</span>
          <h3>$ {(availableBalance ?? 0).toLocaleString('es-CO')} COP</h3>
        </div>

        <div className="cards-row-mobile">
          <div className="card-mobile income-card">
            <div className="card-header">
                <FiArrowUpRight className="income-arrow" />
                <span>Ingreso mensual</span>
            </div>
            <p>$ {(monthlyIncome ?? 0).toLocaleString('es-CO')}</p>
          </div>
          <div className="card-mobile expense-card">
            <div className="card-header">
                <FiArrowDownRight className="expense-arrow" />
                <span>Gasto mensual</span>
            </div>
            <p>$ {(monthlyExpense ?? 0).toLocaleString('es-CO')}</p>
          </div>
        </div>

        {/* Bar chart will go here */}
        <div className="card-mobile chart-card">
            <p>Aquí irá el gráfico de barras</p>
        </div>

        {/* Budget Section */}
        <div className="card-mobile budget-card">
            <div className="card-header-alt">
                <h3>Presupuesto</h3>
                <FiChevronRight />
            </div>
            <div className="budget-main">
                <span className="budget-used">${(budget.used ?? 0).toLocaleString('es-CO')}</span>
                <span className="budget-total">de ${(budget.total ?? 0).toLocaleString('es-CO')}</span>
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{width: `${budget.percentage ?? 0}%`}}></div>
            </div>
            <div className="budget-footer-alt">
                <span>{budget.percentage ?? 0}% Utilizado</span>
                <span>Disponible: ${(budget.available ?? 0).toLocaleString('es-CO')}</span>
            </div>
        </div>

        {/* Good Pace Section */}
        <div className="card-mobile good-pace-card">
            <div className="good-pace-content">
                <h3>¡Vas por buen camino!</h3>
                <p>Mejoras de este mes:</p>
                <ul>
                    <li>+ {goodPace.savingIncrease ?? 0}% ahorro</li>
                    <li>- {goodPace.variableExpensesDecrease ?? 0}% gastos variables</li>
                    <li>{goodPace.emergencyFundPercentage ?? 0}% del fondo de emergencia completado</li>
                </ul>
            </div>
            <div className="good-pace-image">
              <img src="https://via.placeholder.com/100" alt="Good Pace" />
            </div>
        </div>

        {/* Financial Goals Section */}
        <div className="card-mobile financial-goals-card">
            <div className="card-header-alt">
                <h3>Metas financieras</h3>
                <FiChevronRight />
            </div>
            {financialGoals.map((goal, index) => (
                <div className="goal-item" key={index}>
                    <div className="goal-icon">{iconMap[goal.icon]}</div>
                    <div className="goal-details">
                        <p>{goal.title}</p>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill goal-progress-bar" style={{width: `${goal.percentage}%`}}></div>
                        </div>
                    </div>
                    <div className="goal-percentage">{goal.percentage}%</div>
                </div>
            ))}
        </div>

        {/* Spending Distribution Section */}
        <div className="card-mobile spending-distribution-card">
            <div className="card-header-alt">
                <h3>Distribución de gastos</h3>
                <FiChevronRight />
            </div>
            <div className="spending-distribution-content">
                <div className="donut-chart-placeholder">
                    <div className="donut-chart-center">
                        <p>$ {(spendingDistribution.total ?? 0).toLocaleString('es-CO')}</p>
                        <span>Gastos</span>
                    </div>
                </div>
                <div className="spending-legend">
                    {(spendingDistribution.categories ?? []).map((category, index) => (
                        <div className="legend-item" key={index}>
                            <div className="legend-color" style={{backgroundColor: category.color}}></div>
                            <span>{category.name}</span>
                            <span>{category.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Products Section */}
        <div className="card-mobile products-card">
            <div className="card-header-alt">
                <h3>Tus productos</h3>
                <FiChevronRight />
            </div>
            <div className="products-content">
                {products.map((product, index) => (
                    <div className="credit-card-container" key={index}>
                        <div className="credit-card-visual">
                            <div className="credit-card-top">
                                <span className="card-chip"></span>
                                <span className="card-brand">{product.brand}</span>
                            </div>
                            <div className="credit-card-number">**** **** **** {product.number}</div>
                            <div className="credit-card-bottom">
                                <div>
                                    <span className="card-label">Titular</span>
                                    <span className="card-holder">{product.holder}</span>
                                </div>
                                <div>
                                    <span className="card-label">Expiración</span>
                                    <span className="card-expiration">{product.expiration}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
      </main>

      <footer className="footer-mobile">
        <FiStar className="footer-icon" />
        <FiBarChart2 className="footer-icon" />
        <FiHome className="footer-icon active" />
        <FiDollarSign className="footer-icon" />
        <FiBookOpen className="footer-icon" />
      </footer>
    </div>
  );
};

export default DashboardInicio;
