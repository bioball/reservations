require 'sinatra'
require 'sinatra/activerecord'

class OpenTable < Sinatra::Application
  set :database, 'sqlite3:///opentable.db'
end

# MODEL WITH VALIDATIONS
class Reservation < ActiveRecord::Base
  validates :name, presence: true
  validates :party_size, {
    presence: true, 
    numericality: {
      only_integer: true
    }
  }
  validates :phone_number, length: { in: 9..10 }
end

# STATIC FILES
get '/' do
  File.read(File.join('public', 'index.html'))
end

# REST API

get '/api/reservations' do
  Reservation.all.to_json
end

post '/api/reservations' do
  attrs = JSON.parse(request.body.read)
  reservation = Reservation.new(attrs)
  if reservation.save
    status 201
    reservation.to_json
  else
    status 412
    reservation.errors.full_messages.to_json
  end
end

get '/api/reservations/:id' do |id|
  begin
    reservation = Reservation.find(id)
  rescue Exception => e
    status 404
    e.message.to_json
  else
    status 200
    reservation.to_json
  end
end

delete '/api/reservations/:id' do |id|
  begin
    reservation = Reservation.find(id)
  rescue Exception => e
    status 401
    e.message.to_json
  else
    reservation.destroy
    status 204
  end
end

put '/api/reservations/:id' do |id|
  attrs = JSON.parse(request.body.read)
  reservation = Reservation.find(id)
  if reservation.update_attributes(attrs)
    status 204
  else
    status 401
    reservation.errors.full_messages.to_json
  end
end