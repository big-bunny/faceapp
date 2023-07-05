import DefaultLayout from '@/components/DefaultLayout'
import RegisterForm from '@/components/RegisterForm'
import React, { Component } from 'react'

export class register extends Component {
  render() {
    return (
      <DefaultLayout>
      <div>
        <RegisterForm />
      </div>
      </DefaultLayout>
    )
  }
}

export default register
