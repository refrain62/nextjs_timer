import styles from '@/styles/Home.module.css'

// ファイル名： components/TimerApp.tsx
// ReactとReactのHooksであるuseStateをインポートします
import React, { useState } from 'react'

// プロパティの型定義を行います。初期カウントをnumber型で受け取ることができます
type Props = {
  initicalCount: number
}

// TimerAppというFunctoinal Componentを定義します。Props型のinitialCountを受け取ります
const TimerApp = ({ initicalCount }: Props) => {
  // カウントとその更新関数をuseState Hookで定義します。
  // 初期値はPropsから受けとった初期カウントです
  const [count, setCount] = useState(initicalCount)

  // タイマーが動いているかどうかの状態とその更新関数をuseState Hookで定義します
  // 初期値はfalse
  const [isRunning, setIsRunnning] = useState(false)

  // タイマーを開始する関数を定義します。isRunnnigの状態をtrueに更新
  const start = () => {
    setIsRunnning(true)
  }

  // タイマーを停止する関数を定義します。isRunningの状態をfalseに更新
  const pause = () => {
    setIsRunnning(false)
  }

  // タイマーをリセttおする関数を定義します。カウントを初期カウントに戻し、isRunningの状態をfalseに更新
  const reset = () => {
    setCount(initicalCount)
    setIsRunnning(false)
  }

  // カウントダウンを実行する関数を定義する
  // カウントが0より大きいとき、カウントを減らす
  const tick = () => {
    if (count > 0) {
      setCount((prevCount: number) => {
        return prevCount - 1
      })
    }
  }

  // useEffect Hookを使って、コンポーネントのレンダリング後に実行する処理を設定します
  React.useEffect(() => {
    let timerId: NodeJS.Timeout | null = null

    // タイマーが動いていて、カウントが0より大きい場合に1秒ごとにtick関数を実行するタイマーを設定
    if (isRunning && count > 0) {
      timerId = setInterval(() => {
        tick()
      },
      1000)
    }

    // クリーンアップ関数を定義
    // この関数はコンポーネントがアンマウントされたとき、または依存配列が更新されたときに呼ばれます。
    // ここではタイマーをクリアします。
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    }

  },
  // 依存配列にisRunningとカウントを指定
  // これにより、いずれかが変更されるたびにエフェクトが実行される
  [isRunning, count]
  )

  // カウントと操作ボタンを表示するdiv要素をレンダリングします
  return (
    <div>
      {/* 現在のカウント値 */}
      <div>{count}</div>
      {/* カウント開始 */}
      <button
        className={styles.button}
        onClick={start}
        >start</button>
      {/* カウント停止 */}
      <button
        className={styles.button}
        onClick={pause}
        >pause</button>
      {/* カウントリセット */}
      <button 
        className={styles.button}
        onClick={reset}
        >reset</button>
    </div>
  )
}

// TimerAppコンポーネントを出力
export default TimerApp
