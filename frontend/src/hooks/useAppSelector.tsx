import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../../Index'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector