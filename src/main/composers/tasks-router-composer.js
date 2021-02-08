const MathRouter = require('../../presentation/routers/math-router')
const MathUseCase = require('../../domain/usecases/math-usecase')
const AdditionUseCase = require('../../domain/usecases/addition-usecase')
const SubtractionUseCase = require('../../domain/usecases/subtraction-usecase')
const MultiplicationUseCase = require('../../domain/usecases/multiplication-usecase')
const DivisionUseCase = require('../../domain/usecases/division-usecase')
const RemainderUseCase = require('../../domain/usecases/remainder-usecase')

module.exports = class MathRouterComposer {
  static compose () {
    const additionUseCase = new AdditionUseCase()
    const subtractionUseCase = new SubtractionUseCase()
    const multiplicationUseCase = new MultiplicationUseCase()
    const divisionUseCase = new DivisionUseCase()
    const remainderUseCase = new RemainderUseCase()
    const mathUseCase = new MathUseCase({ additionUseCase, subtractionUseCase, multiplicationUseCase, divisionUseCase, remainderUseCase })
    const mathRouter = new MathRouter(mathUseCase)

    return mathRouter
  }
}
